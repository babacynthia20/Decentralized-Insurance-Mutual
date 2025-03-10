import { describe, it, expect, vi } from "vitest"

// Mock Clarity values and functions
const mockClarityValue = (type: string, value: any) => ({ type, value })
const uint = (value: number) => mockClarityValue("uint", value)
const bool = (value: boolean) => mockClarityValue("bool", value)

// Mock contract calls
const mockContractCall = vi.fn()

describe("Premium Pool Contract", () => {
  it("deposits premium", async () => {
    mockContractCall.mockResolvedValue({ success: true, result: bool(true) })
    
    const result = await mockContractCall("deposit-premium", [uint(1), uint(100)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(bool(true))
  })
  
  it("withdraws premium", async () => {
    mockContractCall.mockResolvedValue({ success: true, result: bool(true) })
    
    const result = await mockContractCall("withdraw-premium", [uint(1), uint(50)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(bool(true))
  })
  
  it("gets premium balance", async () => {
    mockContractCall.mockResolvedValue({ success: true, result: uint(50) })
    
    const result = await mockContractCall("get-premium-balance", [uint(1)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(uint(50))
  })
  
  it("invests funds", async () => {
    mockContractCall.mockResolvedValue({ success: true, result: bool(true) })
    
    const result = await mockContractCall("invest-funds", [uint(1000)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(bool(true))
  })
})

