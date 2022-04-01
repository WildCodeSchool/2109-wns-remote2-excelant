import { render, unmountComponentAtNode } from "react-dom";
import {act} from "react-dom/test-utils";
import { MockedProvider } from "@apollo/client/testing";
import moment from "moment";

import { ProjectType } from "./../_types/_projectTypes";
import ProjectTableItem from "./../components/projects/ProjectTableItem";

let container: any = null;
beforeEach(() => {
  container = document.createElement("table");
  document.body.appendChild(container);
});

afterEach(() => {
  // nettoie en sortie de test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("<ProjectTableItem />", () => {
    const mockFn = jest.fn();
    
    const fakeProject: ProjectType = {
        _id: 'testId',
        name: 'task1',
        status: "InProgress",
        projectManager: 'me',
        dueDate: '01 Jun 2016 14:31:46 -0700',
    };

    it("should display correctly async data", async () => {
        jest.spyOn(global, "fetch").mockImplementation((): Promise<any> =>
            Promise.resolve({
                json: () => Promise.resolve(fakeProject)
            })
        );
        await act(async () => {
            render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <tbody>
                        <ProjectTableItem project={fakeProject} refetch={mockFn}/>
                    </tbody>
                </MockedProvider>
            , container);
        });
        expect(container.querySelector(`[data-testid="name"]`).textContent).toBe(fakeProject.name);
        expect(container.querySelector(`[data-testid="status"]`).textContent).toBe(fakeProject.status);
        expect(container.querySelector(`[data-testid="projectManager"]`).textContent).toBe(fakeProject.projectManager);
        expect(container.querySelector(`[data-testid="dueDate"]`).textContent).toBe(moment(fakeProject.dueDate).format("DD/MM/YYYY"));

    });
});
