;; Claim Processing Contract

;; Data Maps
(define-map claims
  { claim-id: uint }
  {
    policy-id: uint,
    amount: uint,
    status: (string-ascii 20),
    claimant: principal
  }
)

;; Public Functions
(define-public (submit-claim (policy-id uint) (amount uint))
  (let
    (
      (claim-id (+ (var-get last-claim-id) u1))
    )
    (map-set claims
      { claim-id: claim-id }
      {
        policy-id: policy-id,
        amount: amount,
        status: "pending",
        claimant: tx-sender
      }
    )
    (var-set last-claim-id claim-id)
    (ok claim-id)
  )
)

(define-public (process-claim (claim-id uint) (approved bool))
  (let
    (
      (claim (unwrap-panic (map-get? claims { claim-id: claim-id })))
    )
    (asserts! (is-eq tx-sender (var-get admin)) (err u403))
    (asserts! (is-eq (get status claim) "pending") (err u404))
    (map-set claims
      { claim-id: claim-id }
      (merge claim { status: (if approved "approved" "rejected") })
    )
    (ok true)
  )
)

(define-read-only (get-claim (claim-id uint))
  (map-get? claims { claim-id: claim-id })
)

;; Variables
(define-data-var last-claim-id uint u0)
(define-data-var admin principal tx-sender)

