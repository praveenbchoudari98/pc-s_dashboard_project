const TextInput = ({handleChange,placeholder,type,...otherProps}) =>(
    <input    
    placeholder={placeholder}
    onChange={handleChange}
    type={type}    
    {...otherProps}
    />
)
export default TextInput;