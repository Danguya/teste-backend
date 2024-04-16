import{r as f,u as g,j as e,L as b,A as j}from"./index-DIdqL2Lk.js";import{s as v,T as o,B as w}from"./Button-DnuDHBhs.js";import{u as y,t as S,z as a}from"./zod-DqG4nR4Q.js";import{B as T}from"./Box-hEsasCTb.js";const B=v("div")`
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
`,E=a.object({name:a.string().min(4,"O nome deve ter no mínimo 4 caracteres."),email:a.string().email("E-mail não é válido."),password:a.string().min(6,"A senha deve ter no mínimo 6 caracteres.")});function F(){var i,n,l;const m=y({defaultValues:{name:"",email:"",password:""},resolver:S(E)}),{register:t,handleSubmit:d,formState:c}=m,{errors:r}=c,[s,p]=f.useState(""),u=g(),x=async h=>{try{await j.post("/users",h),u("/login")}catch{p("Ocorreu um erro ao fazer cadastro, tente novamente.")}};return e.jsx(B,{children:e.jsxs(T,{component:"form",noValidate:!0,autoComplete:"off",onSubmit:d(x),children:[e.jsx("h2",{children:"Login no Sistema"}),e.jsx(o,{id:"outlined-basic",label:"Nome",variant:"outlined",...t("name"),error:!!r.name,helperText:(i=r.name)==null?void 0:i.message}),e.jsx(o,{id:"outlined-basic",label:"e-mail",variant:"outlined",...t("email"),error:!!r.email,helperText:(n=r.email)==null?void 0:n.message}),e.jsx(o,{id:"outlined-basic",label:"senha",variant:"outlined",...t("password"),error:!!r.password,helperText:(l=r.password)==null?void 0:l.message}),s&&e.jsx("p",{children:s}),e.jsx(w,{type:"submit",variant:"outlined",style:{height:"48px"},children:"Criar conta"}),e.jsxs("p",{children:["Se já tem uma conta, faça o ",e.jsx(b,{to:"/login",children:"login"})]})]})})}export{F as default};
