import { MockedProvider } from "@apollo/client/testing";
import TaskTableItem from "./../components/tasks/TaskTableItem";
import {render, unmountComponentAtNode} from "react-dom";
import { act } from "@testing-library/react";


    let container: any = null;
    beforeEach(() => {
        // met en place un élément DOM comme cible de rendu
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // nettoie en sortie de test
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    describe("<TaskTableItem/>", () => {
        it("render a task", async () => {
            const fakeTask = {
                _id: "2",
                name: "Manger",
                status: "done",
                dueDate: "04/09/2022",
                assigne: "John Doe",
                project: {
                    name: "La vie"
                }
            };  
            jest.spyOn(global, "fetch").mockImplementation(() : any =>    
                Promise.resolve({      
                    json: () => Promise.resolve(fakeTask)    
                })  
            );
            // Utilise la version asynchrone de `act` pour appliquer les promesses accomplies
            await act(async () => {
              render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <TaskTableItem task={fakeTask} />
                </MockedProvider>
                , container);
            });
          
            expect(container.querySelector('name').textContent).toBe(fakeTask.name);
            expect(container.querySelector('status').textContent).toBe(fakeTask.status);
            expect(container.querySelector('assigne').textContent).toBe(fakeTask.assigne);
          
        });

    });