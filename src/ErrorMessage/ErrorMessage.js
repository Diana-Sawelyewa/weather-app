import img from './error.png'

const ErrorMessage = () => {
    return (
        <>
        <img alt='' style={{display: 'block', width: '100px', height: '100px', objectFit: 'contain', margin: '0 auto',}} 
        src={img}/>
        <div style={{textAlign: 'center', marginTop: '30px'}}>{"Ошибка :("}</div>
        </>
    )
}

export default ErrorMessage;