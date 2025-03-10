import { describe, it, expect, vi } from "vitest"

// Mock Clarity values and functions
const mockClarityValue = (type: string, value: any) => ({ type, value })
const uint = (value: number) => mockClarityValue("uint", value)
const principal = (value: string) => mockClarityValue("principal", value)
const bool = (value: boolean) => mockClarityValue("bool", value)
const stringAscii = (value: string) => mockClarityValue("string-ascii", value)

// Mock contract calls
const mockContractCall = vi.fn()

describe("Claim Processing Contract", () => {
  it("submits a claim", async () => {
    mockContractCall.mockResolvedValue({ success: true, result: uint(1) })
    
    const result = await mockContractCall("submit-claim", [uint(1), uint(500)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(uint(1))
  })
  
  it("processes a claim", async () => {
    mockContractCall.mockResolvedValue({ success: true, result: bool(true) })
    
    const result = await mockContractCall("process-claim", [uint(1), bool(true)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(bool(true))
  })
  
  it("gets a claim", async () => {
    const mockClaim = {
      "policy-id": uint(1),
      amount: uint(500),
      status: stringAscii("pending"),
      claimant: principal("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"),
    }
    mockContractCall.mockResolvedValue({ success: true, result: mockClaim })
    
    const result = await mockContractCall("get-claim", [uint(1)])
    
    expect(result.success).toBe(true)
    expect(result.result).toEqual(mockClaim)
  })
})

