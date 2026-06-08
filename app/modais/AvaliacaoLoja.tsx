import { useState } from "react";

interface ReviewModalProps {
  storeName?: string;
  storeId: number;
  avaliacaoExistente?: {
    id: number;
    rating: number;
    texto: string;
  };
  onClose?: () => void;
  onSubmit?: (rating: number, review: string) => void;
  onDelete?: () => void;
}

export default function ReviewModal({
  storeName = "Rare Beauty",
  storeId,
  avaliacaoExistente,
  onClose,
  onSubmit,
  onDelete,
}: ReviewModalProps) {
  const [hovered, setHovered] = useState(0);
  const [rating, setRating] = useState(avaliacaoExistente?.rating ?? 0);
  const [review, setReview] = useState(avaliacaoExistente?.texto ?? "");

  const handleSubmit = () => {
    onSubmit?.(rating, review);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <p className="modal-title">
          Você está avaliando <strong>{storeName}</strong>
        </p>

        {/* Estrelas */}
        <div className="stars-row">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`star-btn ${star <= (hovered || rating) ? "filled" : ""}`}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
              aria-label={`${star} estrela${star > 1 ? "s" : ""}`}
            >
              <svg
                viewBox="0 0 51 48"
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="57"
              >
                <path
                  d="M25.5 2l6.6 13.4 14.8 2.1-10.7 10.4 2.5 14.7L25.5 36l-13.2 6.9 2.5-14.7L4.1 17.5l14.8-2.1z"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          className="review-textarea"
          placeholder="Avaliação da loja"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        {/* Botões */}
        <div className="buttons-row">
          {avaliacaoExistente && (
            <button className="delete-btn" onClick={onDelete}>
              Deletar
            </button>
          )}
          <button className="submit-btn" onClick={handleSubmit}>
            {avaliacaoExistente ? "Salvar" : "Avaliar"}
          </button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', sans-serif;
          z-index: 1000;
        }

        .modal {
          position: relative;
          background: #f0eef5;
          border-radius: 12px;
          padding: 16px;
          width: 376px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .close-btn {
          position: absolute;
          top: 12px;
          right: 14px;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #333;
          line-height: 1;
          padding: 0;
        }

        .close-btn:hover {
          color: #000;
        }

        .modal-title {
          margin: 0;
          margin-top: 8px;
          font-size: 17px;
          color: #1a1a1a;
          text-align: center;
        }

        .modal-title strong {
          font-weight: 700;
        }

        .stars-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .star-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.1s ease;
        }

        .star-btn:hover {
          transform: scale(1.1);
        }

        .star-btn svg path {
          fill: transparent;
          stroke: #7c5cbf;
          transition: fill 0.15s ease;
        }

        .star-btn.filled svg path {
          fill: #7c5cbf;
          stroke: #7c5cbf;
        }

        .review-textarea {
          width: 344px;
          height: 100px;
          padding: 8px;
          border: 2px solid #5b7fe8;
          border-radius: 6px;
          background: #fff;
          font-size: 14px;
          color: #333;
          resize: vertical;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
        }

        .review-textarea::placeholder {
          color: #aaa;
        }

        .review-textarea:focus {
          border-color: #4a6fd4;
        }

        .buttons-row {
          width: 344px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .delete-btn {
          width: 100%;
          height: 44px;
          background: #e53935;
          color: #fff;
          border: none;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .delete-btn:hover {
          background: #c62828;
        }

        .submit-btn {
          width: 100%;
          height: 44px;
          background: #6b3fd4;
          color: #fff;
          border: none;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .submit-btn:hover {
          background: #5a32b8;
        }

        .submit-btn:active {
          background: #4a28a0;
        }
      `}</style>
    </div>
  );
}