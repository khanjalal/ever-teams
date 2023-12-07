import { useKanban } from "@app/hooks/features/useKanban";
import { withAuthentication } from "lib/app/authenticator";
import { KanbanView } from "lib/features/team-members-kanban-view"
import { MainLayout } from "lib/layout";

const Kanban= () => {
  
    const { data } = useKanban();
   
    return (
        <>
        <MainLayout>
           {Object.keys(data).length > 0 ? 
            <KanbanView itemsArray={data}/>
            :
            null
           }
        </MainLayout>
        </>
    )
}

export default withAuthentication(Kanban, { displayName: 'Kanban'});
