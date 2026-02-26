"use client"

import React, { useState, useEffect } from "react"
import { Table as AntTable, ConfigProvider, Pagination } from "antd"
import type { TableProps as AntTableProps } from "antd"
import type { AnyObject } from "antd/es/_util/type"

import DataCard from "../AxCard/DataCard"
import type { AxDataCardField } from "../AxCard/DataCard"
import styles from "./index.module.css"

// ---------------------------------------------------------------------------
// Row state type
// ---------------------------------------------------------------------------

/**
 * Visual state applied to a row.
 * - `selected`  → blue-25 background + blue-600 left border accent
 * - `disabled`  → reduced opacity + no pointer events
 */
export type AxTableRowState = "selected" | "disabled"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxTableProps<RecordType extends AnyObject = AnyObject> = {
  /**
   * Visual state per row key.
   * Pass a record mapping each row key to its state.
   *
   * @example
   * rowStates={{ "1": "selected", "2": "selected", "3": "disabled" }}
   */
  rowStates?: Record<string | number, AxTableRowState>

  /**
   * Override the header background color.
   * Defaults to "#FAFAFA" (neutral-50).
   */
  headerBg?: string

  /**
   * Layout on mobile (< 576px):
   * - `"cards"` — each row renders as a stacked card (default)
   * - `"scroll"` — horizontal scroll table
   */
  mobileLayout?: "scroll" | "cards"

  /**
   * Automatically hide middle columns as the viewport shrinks.
   * First and last columns always stay visible. Middle columns
   * are progressively hidden right-to-left across xl → lg → md
   * breakpoints. Columns with explicit `responsive` or `fixed`
   * props are left untouched.
   * @default true
   */
  autoResponsive?: boolean

  /**
   * Page size used when the mobile card view is active.
   * Overrides the regular pagination `pageSize` on small screens
   * to keep the card list manageable.
   * @default 5
   */
  mobilePageSize?: number
} & AntTableProps<RecordType>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getRowKey<RecordType>(
  record: RecordType,
  rowKey: AntTableProps<RecordType>["rowKey"]
): React.Key {
  if (typeof rowKey === "function") return rowKey(record)
  if (typeof rowKey === "string") return (record as any)[rowKey]
  return (record as any).key
}

/**
 * Auto-assign `responsive` breakpoints to middle columns.
 * First and last columns stay visible. Middle columns without explicit
 * `responsive` or `fixed` are hidden right-to-left across xl → lg → md.
 */
const AUTO_BREAKPOINTS: string[][] = [["xl"], ["lg"], ["md"]]

function applyAutoResponsive<T>(columns: AntTableProps<T>["columns"]): AntTableProps<T>["columns"] {
  if (!columns || columns.length <= 3) return columns

  // Find eligible middle column indices
  const eligible: number[] = []
  for (let i = 1; i < columns.length - 1; i++) {
    const col = columns[i] as any
    if (col.responsive || col.fixed) continue
    eligible.push(i)
  }

  if (eligible.length === 0) return columns

  // Assign breakpoints right-to-left (rightmost hides first at widest bp)
  const result = columns.map((col) => ({ ...col }))
  const reversed = [...eligible].reverse()
  reversed.forEach((colIndex, i) => {
    if (i < AUTO_BREAKPOINTS.length) {
      ;(result[colIndex] as any).responsive = AUTO_BREAKPOINTS[i]
    }
  })

  return result
}

/** SSR-safe media query hook */
function useIsMobile(query = "(max-width: 575.98px)"): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [query])

  return matches
}

// ---------------------------------------------------------------------------
// Internal: Card list for mobile layout
// ---------------------------------------------------------------------------

/** Number of body rows visible before expand */
const CARD_PREVIEW_ROWS = 2

function CardList<RecordType extends AnyObject>({
  dataSource,
  columns,
  rowKey,
  pagination,
  onChange,
  mobilePageSize = 5,
}: {
  dataSource?: readonly RecordType[]
  columns?: AntTableProps<RecordType>["columns"]
  rowKey?: AntTableProps<RecordType>["rowKey"]
  pagination?: AntTableProps<RecordType>["pagination"]
  onChange?: AntTableProps<RecordType>["onChange"]
  mobilePageSize?: number
}) {
  const data = dataSource ?? []
  const cols = (columns ?? []) as Array<{
    key?: React.Key
    title?: React.ReactNode
    dataIndex?: string
    render?: (value: any, record: RecordType, index: number) => React.ReactNode
    responsive?: string[]
  }>

  // Pagination state — cap pageSize for mobile cards
  const paginationConfig =
    pagination === false
      ? null
      : typeof pagination === "object"
        ? pagination
        : { pageSize: 10 }

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = paginationConfig
    ? Math.min(paginationConfig.pageSize ?? 10, mobilePageSize)
    : mobilePageSize

  const paginatedData = paginationConfig
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : data

  // Expanded cards state
  const [expandedKeys, setExpandedKeys] = useState<Set<React.Key>>(new Set())

  // First column = card header, rest = key-value fields
  const [headerCol, ...bodyColumns] = cols

  const renderColValue = (
    col: (typeof cols)[number],
    record: RecordType,
    globalIndex: number,
  ) =>
    col.render
      ? col.render(
          col.dataIndex ? (record as any)[col.dataIndex] : record,
          record,
          globalIndex,
        )
      : col.dataIndex
        ? (record as any)[col.dataIndex]
        : null

  return (
    <div>
      <ul className={styles.cardList} role="list">
        {paginatedData.map((record, index) => {
          const key = getRowKey(record, rowKey)
          const globalIndex = paginationConfig
            ? (currentPage - 1) * pageSize + index
            : index

          // Header from first column
          const headerValue = renderColValue(headerCol, record, globalIndex)

          // Remaining columns → DataCard fields
          const fields: AxDataCardField[] = bodyColumns.map((col) => ({
            key: String(col.key ?? col.dataIndex ?? ""),
            label: typeof col.title === "string" ? col.title : "",
            value: renderColValue(col, record, globalIndex),
          }))

          return (
            <li key={String(key)}>
              <DataCard
                header={headerValue}
                fields={fields}
                previewCount={CARD_PREVIEW_ROWS}
                expanded={expandedKeys.has(key)}
                onExpandChange={(expanded) => {
                  setExpandedKeys((prev) => {
                    const next = new Set(prev)
                    expanded ? next.add(key) : next.delete(key)
                    return next
                  })
                }}
              />
            </li>
          )
        })}
      </ul>

      {/* Pagination below cards */}
      {paginationConfig && data.length > pageSize && (
        <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-4) 0" }}>
          <Pagination
            current={currentPage}
            total={data.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            size="small"
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function InternalAxTable<RecordType extends AnyObject = AnyObject>(
  {
    rowStates,
    headerBg = "var(--neutral-50)",
    mobileLayout = "cards",
    autoResponsive = true,
    mobilePageSize = 5,
    className,
    rowClassName,
    ...props
  }: AxTableProps<RecordType>,
  ref: React.Ref<any>
) {
  const isMobile = useIsMobile()
  const showCards = mobileLayout === "cards" && isMobile

  // Auto-assign responsive breakpoints to middle columns
  const processedColumns = autoResponsive
    ? applyAutoResponsive(props.columns)
    : props.columns

  const mergedRowClassName: AntTableProps<RecordType>["rowClassName"] = (
    record,
    index,
    indent
  ) => {
    const key = getRowKey(record, props.rowKey)
    const base =
      typeof rowClassName === "function"
        ? rowClassName(record, index, indent)
        : rowClassName ?? ""

    const state = rowStates?.[key as string | number]
    const classes = [base]
    if (state === "selected") classes.push(styles.rowSelected)
    if (state === "disabled") classes.push(styles.rowDisabled)

    return classes.filter(Boolean).join(" ")
  }

  // Merge ARIA attributes into onRow for accessibility
  const { onRow: userOnRow, scroll, columns: rawColumns, ...restProps } = props
  const mergedOnRow: AntTableProps<RecordType>["onRow"] = rowStates
    ? (record, index) => {
        const userAttrs = userOnRow?.(record, index) ?? {}
        const key = getRowKey(record, restProps.rowKey)
        const state = rowStates[key as string | number]
        return {
          ...userAttrs,
          ...(state === "selected" ? { "aria-selected": true } : {}),
          ...(state === "disabled" ? { "aria-disabled": true } : {}),
        } as React.HTMLAttributes<HTMLTableRowElement>
      }
    : userOnRow

  const tableCls = [
    styles.axTable,
    showCards ? styles.hideOnMobile : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg,
              headerSplitColor: "transparent",
              fontWeightStrong: 700,
              rowExpandedBg: "white",
            },
          },
        }}
      >
        <AntTable<RecordType>
          ref={ref}
          scroll={{ x: true, ...scroll }}
          {...restProps}
          columns={processedColumns}
          onRow={mergedOnRow}
          rowClassName={mergedRowClassName}
          className={tableCls}
        />
      </ConfigProvider>

      {/* Mobile card view — uses raw columns so all fields appear */}
      {showCards && (
        <CardList<RecordType>
          dataSource={restProps.dataSource}
          columns={rawColumns}
          rowKey={restProps.rowKey}
          pagination={restProps.pagination}
          onChange={restProps.onChange}
          mobilePageSize={mobilePageSize}
        />
      )}
    </>
  )
}

const AxTable = React.forwardRef(InternalAxTable) as <
  RecordType extends AnyObject = AnyObject,
>(
  props: AxTableProps<RecordType> & React.RefAttributes<any>
) => React.ReactElement

;(AxTable as any).displayName = "AxTable"
;(AxTable as any).SELECTION_COLUMN = AntTable.SELECTION_COLUMN
;(AxTable as any).EXPAND_COLUMN = AntTable.EXPAND_COLUMN
;(AxTable as any).SELECTION_ALL = AntTable.SELECTION_ALL
;(AxTable as any).SELECTION_INVERT = AntTable.SELECTION_INVERT
;(AxTable as any).SELECTION_NONE = AntTable.SELECTION_NONE
;(AxTable as any).Column = AntTable.Column
;(AxTable as any).ColumnGroup = AntTable.ColumnGroup
;(AxTable as any).Summary = AntTable.Summary

export default AxTable

// ---------------------------------------------------------------------------
// Subcomponent re-exports
// ---------------------------------------------------------------------------

export { default as DeadlineCell } from "./cells/DeadlineCell"
export type { AxDeadlineCellProps } from "./cells/DeadlineCell"

export { default as PriceCell } from "./cells/PriceCell"
export type { AxPriceCellProps } from "./cells/PriceCell"

export { default as AxTableSkeleton } from "./TableSkeleton"
export type { AxTableSkeletonProps, SkeletonColumnConfig } from "./TableSkeleton"
