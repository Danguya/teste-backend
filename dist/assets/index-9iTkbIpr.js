import{r as v,u as w,a as y,j as e,L as E}from"./index-DIdqL2Lk.js";import{s as S,T as c,B}from"./Button-DnuDHBhs.js";import{u as L,t as T,z as a}from"./zod-DqG4nR4Q.js";import{B as k}from"./Box-hEsasCTb.js";const A=S("div")`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #f1f3f5;
  form {
    background-color: #fff;
    padding: 32px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 300px;
    width: 100%;

    h2 {
      text-align: center;
    }
  }
`,I=a.object({email:a.string().email("E-mail não é válido!"),password:a.string().min(6,"A senha deve ter no mínimo 6 caracteres")});function N(){var i,n;const[t,p]=v.useState(""),u=w(),{signIn:x}=y(),h=L({defaultValues:{email:"",password:""},resolver:T(I)}),{register:o,handleSubmit:g,formState:f}=h,{errors:r}=f,b=async j=>{var l,d;try{const{email:s,password:m}=j;await x({email:s,password:m}),u("/")}catch(s){(((d=(l=s.response)==null?void 0:l.data)==null?void 0:d.message)||"An error occurred")==="Invalid credentials."&&p("E-mail ou senha errada!")}};return e.jsx(A,{children:e.jsxs(k,{component:"form",noValidate:!0,autoComplete:"off",onSubmit:g(b),children:[e.jsx("h2",{children:"Login no Sistema"}),e.jsx(c,{id:"outlined-basic",label:"email",variant:"outlined",...o("email"),error:!!r.email,helperText:(i=r.email)==null?void 0:i.message}),e.jsx(c,{id:"outlined-basic",type:"password",label:"senha",variant:"outlined",...o("password"),error:!!r.password,helperText:(n=r.password)==null?void 0:n.message}),t&&e.jsx("p",{children:t}),e.jsx(B,{type:"submit",variant:"outlined",style:{height:"48px"},children:"Entrar"}),e.jsxs("p",{children:["Ir a página de ",e.jsx(E,{to:"/register",children:"registro"})]})]})})}export{N as default};
