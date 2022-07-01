import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/client/testing";
import moment from "moment";
import { SnackbarProvider } from "notistack";

import { TaskType } from "../_types/_taskTypes";
import TaskTableItem from "../components/tasks/TaskTableItem";

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

describe("<TaskTableItem />", () => {
  const mockFn = jest.fn();

  const fakeTask: TaskType = {
    _id: "testId",
    name: "task1",
    status: "InProgress",
    assigne: { _id: "123", name: "me" },
    dueDate: "01 Jun 2016 14:31:46 -0700",
    description: "Task description",
    project: {
      _id: "projectTestId",
      name: "ProjectName",
    },
  };

  it("should display correctly async data", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      (): Promise<any> =>
        Promise.resolve({
          json: () => Promise.resolve(fakeTask),
        })
    );
    await act(async () => {
      render(
        <SnackbarProvider>
          <MockedProvider mocks={[]} addTypename={false}>
            <tbody>
              <TaskTableItem task={fakeTask} refetch={mockFn} />
            </tbody>
          </MockedProvider>
        </SnackbarProvider>,
        container
      );
    });
    expect(container.querySelector(`[data-testid="name"]`).textContent).toBe(
      fakeTask.project.name
    );
    expect(container.querySelector(`[data-testid="status"]`).textContent).toBe(
      fakeTask.status
    );
    expect(container.querySelector(`[data-testid="assigne"]`).textContent).toBe(
      fakeTask.assigne.name
    );
    expect(container.querySelector(`[data-testid="dueDate"]`).textContent).toBe(
      moment(fakeTask.dueDate).format("DD/MM/YYYY")
    );
  });
});
