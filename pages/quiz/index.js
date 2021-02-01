/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import db from '../../db.json'
import Button from '../../src/components/Button'
import QuizBackground from '../../src/components/QuizBackground'
import Widget from '../../src/components/Widget'
import QuizContainer from '../../src/components/QuizContainer'
import Lottie from 'react-lottie'
import LoadingAnimation from '../../src/animations/loading.json'
import AlternativesForm from '../../src/components/AlternativesForm'
/* eslint-disable react/react-in-jsx-scope */

function ResultWidget ({ results }) {
  return (
        <Widget>
            <Widget.Header>
                Resultado
            </Widget.Header>
            <Widget.Quiz>
                <p>
                Você acertou
                {' '}
                {/* {results.reduce((somatoriaAtual, resultadoAtual) => {
                  const isCerto = resultadoAtual === true
                  if (isCerto) {
                    return somatoriaAtual + 1
                  }
                  return somatoriaAtual
                })} */}
                {results.filter((x) => x).length}
                {' '}
                    perguntas.
                </p>
           <ul>
               {results.map((result, index) => (
                   <li key={`result__${result}`}>
                       #{index + 1}{' '}Resultado:
                      {result === true
                        ? 'Acertou'
                        : 'Errou'}
                   </li>
               ))}
           </ul>
            </Widget.Quiz>
        </Widget>
  )
}

function LoadingWidget () {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [animationState, setAnimationState] = React.useState({ isStopped: false, isPaused: false })
  return (
      <Widget>
          <Widget.Header>
              Loading...
          </Widget.Header>
          <Widget.Content>
          <Lottie options={defaultOptions}
              height={400}
              width={400}
              isStopped={animationState.isStopped}
              isPaused={animationState.isPaused}/>
          </Widget.Content>
      </Widget>
  )
}

function QuestionWidget ({ question, page, totalQuestions, onSubmit, addResult }) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined)
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false)
  const questionId = `question__${page}`
  const isCorrect = selectedAlternative === question.answer
  const hasSelectedAlternative = selectedAlternative !== undefined
  return (
    <Widget>
    <Widget.Header>
        <h3>
            {`Pergunta ${page + 1} de ${totalQuestions}`}
        </h3>
    </Widget.Header>
    <img
    alt="Descrição"
    style={{
      width: '100%',
      height: '150px',
      objectFit: 'cover'
    }}
    src={question.image}
    />
  <Widget.Quiz>
     <h2>{question.title}</h2>
     <p>{question.description}</p>
     <AlternativesForm
     onSubmit={(ev) => {
       ev.preventDefault()
       setIsQuestionSubmited(true)
       setTimeout(() => {
         addResult(isCorrect)
         onSubmit()
         setIsQuestionSubmited(false)
         setSelectedAlternative(undefined)
       }, 1000 * 3)
     }}>
     {question.alternatives.map((alternative, altenativeIndex) => {
       const alternativeId = `alternative__${altenativeIndex}`
       const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
       const isSelected = selectedAlternative === altenativeIndex
       return (
             <Widget.Topic
             as="label"
             key={alternativeId}
             htmlFor={alternativeId}
             data-selected={isSelected}
             data-status={isQuestionSubmited && alternativeStatus}
             >
           <input
           id={alternativeId}
           style={{ display: 'none' }}
           name={ questionId }
           onChange={() => setSelectedAlternative(altenativeIndex)}
           type='radio'
           />
            {alternative}
           </Widget.Topic>
       )
     }
     )}
    <Button type='submit' disabled={!hasSelectedAlternative}>Confirmar</Button>
    {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
    {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
    </AlternativesForm>
  </Widget.Quiz>
</Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

export default function QuizPage () {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING)
  const [results, setResults] = React.useState([])
  const [page, setPage] = React.useState(0)
  const totalQuestions = db.questions.length
  const question = db.questions[page]

  function addResult (result) {
    setResults([
      ...results,
      result
    ])
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 2 * 1000)
  }, [])

  function handleSubmit () {
    const nextPage = page + 1
    if (nextPage < totalQuestions) {
      setPage(nextPage)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
       <QuizBackground backgroundImage={db.bg}>
           <QuizContainer>
           {screenState === screenStates.QUIZ && (
           <QuestionWidget
           question={question}
           page={page}
           totalQuestions={totalQuestions}
           onSubmit={handleSubmit}
           addResult={addResult}
           />
           )}
          {screenState === screenStates.LOADING && <LoadingWidget /> }
          {screenState === screenStates.RESULT && <ResultWidget results={results} /> }
           </QuizContainer>
       </QuizBackground>
  )
}
