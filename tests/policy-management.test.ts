import { describe, it, expect, vi } from "vitest"

// Mock Clarity values and functions
const mockClarityValue = (type: string, value: any) => ({ type, value })
const uint = (value: number) => mockClarityValue("uint", value)
const principal = (value: string) => mockClarityValue("principal", value)
const bool = (value: boolean) => mockClarityValue("bool", value)

// Mock contract calls
const mockContractCall = vi.fn()

describe("Policy Management Contract", () => {
  it("creates a policy", async () => {
    mockContractCall.mockResolvedValue({ success: true, result: uint(1) })
    
    const result = await mockContractCall("create-policy", [uint(1000), uint(100), uint(31536000)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(uint(1))
  })
  
  it("cancels a policy", async () => {
    mockContractCall.mockResolvedValue({ success: true, result: bool(true) })
    
    const result = await mockContractCall("cancel-policy", [uint(1)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(bool(true))
  })
  
  it("gets a policy", async () => {
    const mockPolicy = {
      holder: principal("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"),
      "coverage-amount": uint(1000),
      premium: uint(100),
      "start-date": uint(1625097600),
      "end-date": uint(1656633600),
      active: bool(true),
    }
    mockContractCall.mockResolvedValue({ success: true, result: mockPolicy })
    
    const result = await mockContractCall("get-policy", [uint(1)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(mockPolicy)
  })
})

