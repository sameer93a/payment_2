export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        <Heading type="signup" />
        <InputField fieldName="Full Name" />
        <InputField fieldName="Email" />
        <InputField fieldName="Password" />
        <Button />
      </div>
    </div>
  );
};

function Heading({ type }: { type: string }) {
  return (
    <div>
      <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
        <div>
          {type === "signup" ? "Create an Account" : "Sign in to your account"}
        </div>
      </h2>
    </div>
  );
}

function InputField({ fieldName }: { fieldName: string }) {
  return (
    <div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {fieldName}
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

{
  /* 
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
<img
  alt="Your Company"
  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
  className="mx-auto h-10 w-auto"
/>

</div> */
}

// htmlFor = "email";
