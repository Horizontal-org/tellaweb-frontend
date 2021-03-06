import { useEffect, useContext } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LoginPage } from "packages/ui";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { useAuth } from "packages/state/features/auth/authHooks";
import { useLoginMutation } from "packages/state/services/auth";
import {
  setCredentials,
  setError,
} from "packages/state/features/auth/authSlice";
import { useUserProfile } from "packages/state/features/user/userHooks";
import { Credential } from "packages/state/domain/user";
import { setUser } from "packages/state/features/user/userSlice";
import { useLazyGetProfileQuery } from "packages/state/services/user";
import { AbilityContext } from "common/casl/Can";
import { updateAbility } from "common/casl/Ability";

const Login = () => {
  const { errorMessage, accessToken } = useAuth();
  const user = useUserProfile();
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [loadUserProfile, { data }] = useLazyGetProfileQuery();
  const ability = useContext(AbilityContext);

  useEffect(() => {
    if (user) router.replace("/report");
  }, [user]);

  useEffect(() => {
    if (accessToken && !user && !data) {
      loadUserProfile();
      return;
    }
    if (data) {
      updateAbility(data, ability)
      dispatch(setUser(data))
    };
  }, [accessToken, user, data]);

  const doLogin = async (credential: Credential) => {
    try {
      const data = await login(credential).unwrap();
      dispatch(setCredentials(data));
    } catch (err) {
      dispatch(setError(err.data.message || "Something went wrong, try again"));
    }
  };

  return (
    <LoginPage
      onSubmit={doLogin}
      errorMessage={errorMessage}
      isLoading={isLoading}
    />
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default Login;
