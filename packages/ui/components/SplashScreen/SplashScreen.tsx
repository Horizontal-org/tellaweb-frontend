import { FunctionComponent, useState, ReactNode, useEffect, useContext } from 'react'
import { useAuthRequired } from "packages/state/features/auth/authHooks";
import { useRouter } from "next/router";
import { AbilityContext } from 'common/casl/Can';
import { ENTITIES, validateRoute } from 'common/casl/Ability'
import Img from "next/image";
import logo from "../../assets/tella-sidelogo.png";

interface Props {
  children: ReactNode
}



export const SplashScreen: FunctionComponent<Props> = ({ children }) => {  
  const user = useAuthRequired("/login");
  const router = useRouter()
  const ability = useContext(AbilityContext);
  const [ready, handleReady] = useState<boolean>(false)
  
  useEffect(() => {
    const changeRouter = (async () => {
      const validate = validateRoute(ability, router.pathname)    
      if (!validate) {
        await router.replace('/404')
      }

      if (router.pathname == '/') {
        await router.replace('/report')
      }
      handleReady(true)
    })

    if (user) {
      changeRouter()
      return
    }

    if (router.pathname == '/login') {
      handleReady(true)
    }
  }, [user])

  
  return (
    !!(ready) ? (
      <>
        { children }
      </>
    ) : (
      <div
        className='flex justify-center items-center' 
        style={{
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
        }}
      >
        <Img
          src={logo} 
          width="125px" 
          height="36px" 
          alt="Tella logo" 
        />
      </div>
    )    
  )
}
