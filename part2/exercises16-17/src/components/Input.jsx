const Input = ({text, newValue, onChange}) => {
    return(
        <div>
            {text}: <input value={newValue} onChange={onChange} />
        </div>
    )
}

export default Input