;; Risk Assessment Contract

;; Data Maps
(define-map risk-factors
  { factor: (string-ascii 20) }
  { weight: uint }
)

;; Public Functions
(define-public (add-risk-factor (factor (string-ascii 20)) (weight uint))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) (err u403))
    (map-set risk-factors
      { factor: factor }
      { weight: weight }
    )
    (ok true)
  )
)

(define-public (calculate-premium (policy-id uint) (risk-score uint))
  (let
    (
      (base-premium u1000)
      (risk-multiplier (/ risk-score u100))
    )
    (ok (* base-premium (+ u1 risk-multiplier)))
  )
)

(define-read-only (get-risk-factor (factor (string-ascii 20)))
  (map-get? risk-factors { factor: factor })
)

;; Variables
(define-data-var admin principal tx-sender)

