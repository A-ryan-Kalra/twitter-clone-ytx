import Image from "next/image";
import { signIn } from "next-auth/react";

function Login({ providers }) {
  //   console.log(Object.values(providers));
  return (
    <div className="text-white flex flex-col items-center justify-center  h-screen">
      <Image
        src={"https://rb.gy/ogau5a"}
        width={150}
        height={150}
        objectFit="contain"
      />
      <div>
        {Object.values(providers)?.map((provider, index) => (
          <div key={index}>
            <button
              class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign in with {provider.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
