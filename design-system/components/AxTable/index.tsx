"use client"

import React from "react"
import { Table as AntTable, ConfigProvider } from "antd"
import type { TableProps as AntTableProps } from "antd"
import type { AnyObject } from "antd/es/_util/type"

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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function InternalAxTable<RecordType extends AnyObject = AnyObject>(
  {
    rowStates,
    headerBg = "var(--neutral-50)",
    className,
    rowClassName,
    ...props
  }: AxTableProps<RecordType>,
  ref: React.Ref<any>
) {
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

  return (
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
        {...props}
        rowClassName={mergedRowClassName}
        className={`${styles.axTable} ${className ?? ""}`}
      />
    </ConfigProvider>
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
