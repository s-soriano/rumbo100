export default function LockScreen({ message, onUpgrade }) {
  return (
    <div className="lock-screen">
      <div className="lock-content">
        <span className="lock-icon">🔒</span>
        <h3 className="lock-title">Función exclusiva PRO</h3>
        <p className="lock-message">{message}</p>
        <button className="btn upgrade-btn lock-upgrade-btn" onClick={onUpgrade}>
          ⭐ Activar PRO — Gratis durante la beta
        </button>
        <p className="lock-note">
          En producción: Stripe + Supabase Auth. Ahora simulado con localStorage.
        </p>
      </div>
    </div>
  );
}
