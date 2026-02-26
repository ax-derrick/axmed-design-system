"use client"

import React, { useRef, useCallback, useEffect } from "react"
import { SearchOutlined } from "@ant-design/icons"

import AxInput from "."
import type { AxInputProps } from "."

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type AxSearchInputProps = {
  /**
   * Called with the current search value after the debounce delay.
   * If omitted, only `onChange` fires (standard controlled input behaviour).
   */
  onSearch?: (value: string) => void

  /**
   * Debounce delay in ms before `onSearch` fires.
   * @default 300
   */
  debounce?: number
} & Omit<AxInputProps, "prefix" | "type">

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AxSearchInput: React.FC<AxSearchInputProps> = ({
  onSearch,
  debounce: debounceMs = 300,
  onChange,
  allowClear = true,
  placeholder = "Search...",
  ...props
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clean up any pending timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      if (onSearch) {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
          onSearch(e.target.value)
        }, debounceMs)
      }
    },
    [onChange, onSearch, debounceMs],
  )

  return (
    <AxInput
      prefix={<SearchOutlined />}
      allowClear={allowClear}
      placeholder={placeholder}
      onChange={handleChange}
      {...props}
    />
  )
}

AxSearchInput.displayName = "AxSearchInput"

export default AxSearchInput
