import { Application } from "./deps.ts";

import routes from './routes/routes.ts';
// import { firebaseAuth, virtualStorage } from './database/firebase.ts'

const app = new Application();
const users = new Map();

// app.use(virtualStorage());
// app.use(async (ctx, next) => {
//   const signedInUid = ctx.cookies.get("LOGGED_IN_UID");
//   const signedInUser = signedInUid != null ? users.get(signedInUid) : undefined;

//   if (!signedInUid || !signedInUser || !firebaseAuth.currentUser) {
//     const creds = await firebaseAuth.signInWithEmailAndPassword(
//       Deno.env.get("FIREBASE_USERNAME"),
//       Deno.env.get("FIREBASE_PASSWORD"),
//     );
    
//     const { user } = creds;
//     if (user) {
//       users.set(user.uid, user);
//       ctx.cookies.set("LOGGED_IN_UID", user.uid);
//     } else if (signedInUser && signedInUid.uid !== firebaseAuth.currentUser?.uid) {
//       await firebaseAuth.updateCurrentUser(signedInUser);
//     }
//   }

//   return next();
// });

app.use(async (ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*');
  ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  await next();
});

app.use(routes.routes());
app.use(routes.allowedMethods());

console.log("Listening on http://localhost:3000");
app.listen({ port: 3000 });
