import { auth, signIn, signOut } from "@/lib/auth";

export default async function Index() {
  const session = await auth();
  if (session) {
    return (
      <div>
        <p>Signed In</p>
        <pre className="p-4 rounded-md bg-neutral-100 text-wrap dark:bg-neutral-800">
          {session ? JSON.stringify(session, null, 2) : "null"}
        </pre>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="w-full">
          <input
            type="submit"
            value="Sign out"
          />{" "}
        </form>
      </div>
    );
  }
  return (
    <div>
      <p>Signed out</p>
      <form
        action={async () => {
          "use server";
          await signIn();
        }}>
        <input
          type="submit"
          value="Sign In"
        />
      </form>
    </div>
  );
}
