export default function Error ({ title, message, onConfirm}) {
    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{message}</p>
            {onConfirm && (
                <div id="cofnirmation-actions">
                    <button onClick={onConfirm} className="button">
                        <Okay></Okay>
                    </button>
                </div>
            )}
        </div>
    );
}