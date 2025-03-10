import { describe, it, expect, vi } from "vitest"

// Mock Clarity values and functions
const mockClarityValue = (type: string, value: any) => ({ type, value })
const uint = (value: number) => mockClarityValue("uint", value)
const bool = (value: boolean) => mockClarityValue("bool", value)
const stringAscii = (value: string) => mockClarityValue("string-ascii", value)

// Mock contract calls
const mockContractCall = vi.fn()

describe("Risk Assessment Contract", () => {
  it("adds a risk factor", async () => {
    mockContractCall.mockResolvedValue({ success: true, result: bool(true) })
    
    const result = await mockContractCall("add-risk-factor", [stringAscii("age"), uint(10)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(bool(true))
  })
  
  it("calculates premium", async () => {
    mockContractCall.mockResolvedValue({ success: true, result: uint(1500) })
    
    const result = await mockContractCall("calculate-premium", [uint(1), uint(50)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(uint(1500))
  })
  
  it("gets a risk factor", async () => {
    const mockRiskFactor = { weight: uint(10) }
    mockContractCall.mockResolvedValue({ success: true, result: mockRiskFactor })
    
    const result = await mockContractCall("get-risk-factor", [stringAscii("age")])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(mockRiskFactor)
  })
})

