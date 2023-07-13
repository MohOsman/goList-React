function TodoItem({ task, onDelete, onCompletionChange }) {
    const { id, title, description, isDone } = task;

    const handleCheckboxChange = () => {
        onCompletionChange(id);
    };

    return (
        <div className={`task-item ${isDone ? 'completed' : ''}`}>
            <div className="task-item__content">
                <h3 className="task-item__title">{title}</h3>
                <p>{description}</p>
            </div>
            <div className="task-item__actions">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={isDone}
                        onChange={handleCheckboxChange}
                    />
                    Completed
                </label>
                <button onClick={onDelete} className="delete-button">
                    Delete
                </button>
            </div>
        </div>
        );
}
export default TodoItem