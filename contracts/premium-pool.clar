;; Premium Pool Contract

;; Data Maps
(define-map premium-balances
  { policy-id: uint }
  { balance: uint }
)

;; Public Functions
(define-public (deposit-premium (policy-id uint) (amount uint))
  (let
    (
      (current-balance (default-to u0 (get balance (map-get? premium-balances { policy-id: policy-id }))))
    )
    (map-set premium-balances
      { policy-id: policy-id }
      { balance: (+ current-balance amount) }
    )
    (ok true)
  )
)

(define-public (withdraw-premium (policy-id uint) (amount uint))
  (let
    (
      (current-balance (default-to u0 (get balance (map-get? premium-balances { policy-id: policy-id }))))
    )
    (asserts! (>= current-balance amount) (err u401))
    (map-set premium-balances
      { policy-id: policy-id }
      { balance: (- current-balance amount) }
    )
    (ok true)
  )
)

(define-read-only (get-premium-balance (policy-id uint))
  (default-to u0 (get balance (map-get? premium-balances { policy-id: policy-id })))
)

;; Admin Functions
(define-public (invest-funds (amount uint))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) (err u403))
    ;; Simulating investment, in reality, this would interact with other contracts or external systems
    (ok true)
  )
)

;; Variables
(define-data-var admin principal tx-sender)

