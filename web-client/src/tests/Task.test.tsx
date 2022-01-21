import React from 'react';
import BaseRoutes from "../routes/BaseRoutes";
import { MockedProvider } from "@apollo/client/testing";
import TaskTable from "../components/tasks/TaskTable";
import TASKS_QUERY from "../components/tasks/queries";
import {render, queryByTestId} from "@testing-library/react";


const mocks = [
    {
      request: {
        query: TASKS_QUERY,
        variables: {
          name: 'Buck',
        },
      },
      result: {
        data: {
          dog: { id: '1', name: 'Buck', breed: 'bulldog' },
        },
      },
    },
  ];

    describe("<TaskTable/>", () => {
        it('renders without error', () => {
            const component = render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <TaskTable  reload={0} />);
                </MockedProvider>
            );
            console.log(screen);
            expect(queryByTestId('loading')).toBeInTheDocument();
        });

    });
