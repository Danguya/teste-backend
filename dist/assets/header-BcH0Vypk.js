function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/AddTask-DpcJ2MmC.js","assets/index-DIdqL2Lk.js","assets/index-5PImqQ8X.css","assets/zod-DqG4nR4Q.js","assets/index-CNf8jVGw.js","assets/Button-DnuDHBhs.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{r,a as c,j as e,_ as l}from"./index-DIdqL2Lk.js";import{s as t}from"./Button-DnuDHBhs.js";const p=t("header")`
  background-color: #1864ab;
  height: 71px;
  color:#fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }
  h3 {
    cursor: pointer;
  }
  .cta {
    display: flex;
    gap: 8px;
    button {
      padding: 8px;
      background-color: transparent;
      border: none;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: 0.3s ease-in-out;
    }
    button.add_task{
      background: #202020;
      border-radius: 4px;
      padding: 8px 16px;
      &:hover{
        background-color: #181818;
      }
    }
  }

`,x=t("div")`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 9px;
  transition: 0.3s ease;
  cursor: pointer;
  &:hover{
    background-color: #339af0;
  }

  .avatar{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #fff;
    img{
      width: 100%;
      object-fit: cover;
      border-radius: 100%;
    }
  }
  .username {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 2px;
    max-width: 200px;
  }
`,u="/assets/avatar-BJWbFfJd.jpg",f=r.lazy(()=>l(()=>import("./AddTask-DpcJ2MmC.js"),__vite__mapDeps([0,1,2,3,4,5])));function m({user:a}){const[o,s]=r.useState(!1),{signOut:n}=c(),i=()=>{s(!0)},d=()=>{s(!1)};return e.jsxs(p,{children:[e.jsxs("div",{className:"logo",children:[e.jsx("h3",{children:"Gestor De Tarefas"}),e.jsxs(x,{children:[e.jsx("div",{className:"avatar",children:e.jsx("img",{src:u,alt:""})}),e.jsxs("div",{className:"username",children:[e.jsx("div",{children:a.username}),e.jsx("div",{children:a.email})]})]})]}),e.jsxs("div",{className:"cta",children:[e.jsx("button",{className:"add_task",onClick:i,children:"Adicionar Tarefa"}),e.jsx("button",{onClick:n,children:"Terminar Sessão"})]}),e.jsx(f,{handleClose:d,open:o})]})}export{m as default};
