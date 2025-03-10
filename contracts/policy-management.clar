;; Policy Management Contract

;; Data Maps
(define-map policies
  { policy-id: uint }
  {
    holder: principal,
    coverage-amount: uint,
    premium: uint,
    start-date: uint,
    end-date: uint,
    active: bool
  }
)

;; Public Functions
(define-public (create-policy (coverage-amount uint) (premium uint) (duration uint))
  (let
    (
      (policy-id (+ (var-get last-policy-id) u1))
      (current-time (unwrap-panic (get-block-info? time u0)))
    )
    (map-set policies
      { policy-id: policy-id }
      {
        holder: tx-sender,
        coverage-amount: coverage-amount,
        premium: premium,
        start-date: current-time,
        end-date: (+ current-time duration),
        active: true
      }
    )
    (var-set last-policy-id policy-id)
    (ok policy-id)
  )
)

(define-public (cancel-policy (policy-id uint))
  (let
    (
      (policy (unwrap-panic (map-get? policies { policy-id: policy-id })))
    )
    (asserts! (is-eq (get holder policy) tx-sender) (err u403))
    (asserts! (get active policy) (err u404))
    (map-set policies
      { policy-id: policy-id }
      (merge policy { active: false })
    )
    (ok true)
  )
)

(define-read-only (get-policy (policy-id uint))
  (map-get? policies { policy-id: policy-id })
)

;; Variables
(define-data-var last-policy-id uint u0)

