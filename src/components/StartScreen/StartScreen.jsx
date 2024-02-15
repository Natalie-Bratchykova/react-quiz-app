export const StartScreen = ({questionsNum}) =>{
    return <hgroup className="start">
        <h2>Welcome to the React Quiz App!</h2>
        <h3> {questionsNum} questions to test your Japanese knowledge </h3>
        <button>始めましょう</button>
    </hgroup>
}