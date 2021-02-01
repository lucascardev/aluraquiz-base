/* eslint-disable react/react-in-jsx-scope */
import db from '../db.json'
import { useRouter } from 'next/router'
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import NameInput from '../src/components/NameInput'
import PlayButton from '../src/components/PlayButton'
import Link from '../src/components/Link'

export default function Home () {
  // eslint-disable-next-line no-undef
  const [name, setName] = React.useState('')
  const router = useRouter()

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h4>{db.title}</h4>
          </Widget.Header>
          <Widget.Description>
          <p>{db.description}</p>
          </Widget.Description>
            <form onSubmit={(ev) => {
              ev.preventDefault()
              router.push(`/quiz?name=${name}`)
            }} >
          <Widget.Content>
            <NameInput placeholder="Diga seu nome" value={name} setValue={setName} />
            <PlayButton title="Play" name={name}/>
          </Widget.Content>
            </form>
        </Widget>
        <Widget>
        <Widget.Header>
          <h4>Quizes da Galera</h4>
        </Widget.Header>
          <Widget.Description>
              <ul>
              {db.external.map((linkExterno, index) => {
                const [projectName, githubUser] = linkExterno.replace(/\//g, '').replace('https:', '').replace('.vercel.app', '').split('.')
                return (
                  <li key={`link__${index}`}>
                   <Widget.Topic
                   href={`/quiz/${projectName}___${githubUser}`}
                   as={Link}
                   >
                     {`${githubUser}/${projectName}`}
                   </Widget.Topic>
                  </li>
                )
              })}
              </ul>
          </Widget.Description>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omariosouto" />
    </QuizBackground>
  )
}
