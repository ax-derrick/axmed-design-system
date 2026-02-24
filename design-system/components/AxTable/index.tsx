"use client"

import React from "react"
import { Table as AntTable, ConfigProvider } from "antd"
import type { TableProps as AntTableProps } from "antd"
import type { AnyObject } from "antd/es/_util/type"

import styles from "./index.module.css"

export type AxTableProps<RecordType extends AnyObject = AnyObject> = {
  /**
   * Keys of rows that should appear visually selected
   * (blue-25 background + blue-600 left border).
   * This is purely visual — it does NOT control antd rowSelection state.
   */
  selectedRowKeys?: React.Key[]

  /**
   * Keys of rows that should appear visually disabled
   * (reduced opacity, pointer-events: none).
   */
  disabledRowKeys?: React.Key[]

  /**
   * Override the header background color.
   * Defaults to "#FAFAFA" (neutral-50).
   */
  headerBg?: string
} & AntTableProps<RecordType>

function getRowKey<RecordType>(
  record: RecordType,
  rowKey: AntTableProps<RecordType>["rowKey"]
): React.Key {
  if (typeof rowKey === "function") return rowKey(record)
  if (typeof rowKey === "string") return (record as any)[rowKey]
  return (record as any).key
}

function InternalAxTable<RecordType extends AnyObject = AnyObject>(
  {
    selectedRowKeys = [],
    disabledRowKeys = [],
    headerBg = "#FAFAFA",
    className,
    rowClassName,
    ...props
  }: AxTableProps<RecordType>,
  ref: React.Ref<any>
) {
  const selectedSet = React.useMemo(() => new Set(selectedRowKeys), [selectedRowKeys])
  const disabledSet = React.useMemo(() => new Set(disabledRowKeys), [disabledRowKeys])

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

    const classes = [base]
    if (selectedSet.has(key)) classes.push(styles.rowSelected)
    if (disabledSet.has(key)) classes.push(styles.rowDisabled)

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
