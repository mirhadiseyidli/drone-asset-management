import Image from 'next/image';

export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5002/api/auth/google';
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-500 to-black">
      <div className="m-auto w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl">
        <div className="text-center">
          <Image
            src="/images/logo.png"
            alt="Skydio logo"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h2 className="text-3xl font-bold text-gray-900">
            DroneSync
          </h2>
          <p className="mt-2 text-sm text-gray-600">Drone Asset Management Tool</p>
        </div>
        <div className='flex flex-row'>
          <button
            onClick={handleLogin}
            className="inline-flex w-full h-10 px-4 py-2 bg-black text-white border border-black rounded-lg text-sm hover:bg-gray-800 active:bg-gray-700 items-center justify-center text-center"
          >
            <Image
              src="/images/google.png"
              alt="Google logo"
              width={24}
              height={24}
              className="mr-2 h-4 w-4 invert"
            />
            Login with Google
          </button>
        </div>
        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Drone Management Made Easy</span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex flex-wrap justify-center gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-400 to-black p-1 shadow-lg"
              >
                <div className="flex h-full w-full items-center justify-center rounded-md bg-white">
                  <Image
                    src="/images/skydio2small.png"
                    alt="Drone Small"
                    width={100}
                    height={100}
                    className='rounded-md'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
