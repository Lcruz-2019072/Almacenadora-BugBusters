import PropTypes from 'prop-types';

const ComboBox = ({
    options,
    value,
    onChange,
    onBlur,
    label,
    showErrorMessage,
    validationMessage,
}) => {
    return (
        <>
            <div className="auth-form-label">
                <span>{label}</span>
            </div>
            <select
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <span className="auth-form-validation-message">
                {showErrorMessage && validationMessage}
            </span>
        </>
    );
};

ComboBox.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    showErrorMessage: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string,
};

export default ComboBox;
