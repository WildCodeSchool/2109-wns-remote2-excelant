import React from 'react';
import BaseRoutes from "../routes/BaseRoutes";
import { MockedProvider } from "@apollo/client/testing";
import {render, screen} from "@testing-library/react";
import {fireEvent} from "@testing-library/react";

describe("<BaseRoutes />", () => {
    describe("When user click on 'home' link...", () => {
        it("It redirects user on 'HomePage' page", () => {
            render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <BaseRoutes />
                </MockedProvider>
            );
            fireEvent.click(screen.getByTestId("HomePage"));
            expect(screen.getByText(/HomePage/i)).toBeInTheDocument();
        });
    });

    describe("When user click on 'tasks' link...", () => {
        it("It redirects user on 'Tasks' page", () => {
            render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <BaseRoutes />
                </MockedProvider>
            );
            fireEvent.click(screen.getByTestId("Tasks"));
            expect(screen.getByText(/TasksPage/i)).toBeInTheDocument();
        });
    });

    describe("When user click on 'projects' link...", () => {
        it("It redirects user on 'Projects' page.", () => {
            render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <BaseRoutes />
                </MockedProvider>
            );
            fireEvent.click(screen.getByTestId("Projects"));
            expect(screen.getByText(/ProjectsPage/i)).toBeInTheDocument();
        });
    });

    describe("When user click on 'users' link...", () => {
        it("It redirects user on 'Users' page.", () => {
            render(
                <MockedProvider mocks={[]} addTypename={false}>
                    <BaseRoutes />
                </MockedProvider>
            );
            fireEvent.click(screen.getByTestId("Users"));
            expect(screen.getByText(/UsersPage/i)).toBeInTheDocument();
        });
    });
});
