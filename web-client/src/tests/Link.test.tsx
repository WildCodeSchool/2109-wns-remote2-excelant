import React, { useContext } from 'react';
import { Outlet, Routes, Route, Router } from "react-router-dom";
import BaseRoutes from "../routes/BaseRoutes";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import { MockedProvider } from "@apollo/client/testing";
import {getByText, render, screen} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import {fireEvent} from "@testing-library/react";
import { AuthContext } from "../contexts/AuthContext";
import {gql, useQuery} from "@apollo/client";
import GqlRequest from "../_graphql/GqlRequest";
import ProjectsPage from "../pages/ProjectsPage";
import { useAuthToken } from "../hooks/useAuthToken";
import { CookiesProvider, useCookies } from "react-cookie";

describe("<BaseRoutes />", () => {

    const fakeToken: any = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJkNzgyMzllN2M1MjNhMTY5ZGJiYzMiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6InRlc3QzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE42aS5DSEtjZml5MTZCeXMvNHNpT3VPU3JLS2VaQTVVTkhxSUlYbUxNd2JqYWNaUU5sN3IuIiwiY29uZmlybVBhc3N3b3JkIjoiNkxqNWFuN1ZAIiwiX192IjowLCJpYXQiOjE2NTY1ODQyMzV9.etTx6ajCp0DDkE8dKpLd8C_VMxL9kol_7y_lHgfWY8Kq76bAeFRX2elC0BG6Ow6dW_uzXvQ5LNFijldrk6wbC9dKKEhDKYwKIpsO-HCYHI0jOlm9h35OcrHF7VVQfmYHPAM7okURQ372fuJATz8kOeOgm3_yLwuprxlzVoeItxm9Pr-mqDa1-xf-oAMnOAOWoYNrWjPjqK8aP30zKob2_ga7Hr3b_dHRP4FGzf6w_2-d-M1Ciy28R61AuFqQc3FlRWnGz5tixXnrL8sqKlYMkLzmqinmnbzTT9kdwdKg1cfGG6rSuLD3dPPQFPsTz5n-IzlFTZUclPk-vcEjIvsrdCGwJA9t0m1t8MiLarFSiJvEcOAJMYBubUGUOyGJxdfdaXtovKi-6JBvWMiwGHTX9kX38BDxY43h3jaNLbYDkxoRmCNhNzSVGGtl5617Vs9AL8_mzkorvS9PRqtfgzhDbVu_ggnx_BegPoLDuKBugtfdpSuJlqY180e88rj3yX-omFKeOoj6oyjBfMDxd95_lbTwbkH8Ev5tfPed8f1bt380a2YO7afc71xoIj-1PH1aBDO_mbvg2IEJ11ddvUd0RjbtcDa-zyXyidbnDw-YZDYAv9bYiAPoqlAsjhEXRo_bsSdwt227_P3QYlO8KDxcmCgQfYTOI9fDL3fcPreLKQk"
    // describe("When user click on 'home' link...", () => {
    //     it("It redirects user on 'Home' page", () => {
    //         render(
    //             <MockedProvider mocks={[]} addTypename={false}>
    //                 <ProtectedRoutes />
    //             </MockedProvider>
    //         );
    //         fireEvent.click(screen.getByTestId("Home"));
    //         expect(screen.getByText(/HomePage/i)).toBeInTheDocument();
    //     });
    // });

    // describe("When user click on 'tasks' link...", () => {
    //     it("It redirects user on 'Tasks' page", () => {
    //         render(
    //             <MockedProvider mocks={[]} addTypename={false}>
    //                 <BaseRoutes />
    //             </MockedProvider>
    //         );
    //         fireEvent.click(screen.getByTestId("Tasks"));
    //         expect(screen.getByText(/TasksPage/i)).toBeInTheDocument();
    //     });
    // });

    describe("When user click on 'projects' link...", () => {
        it("It redirects user on 'Projects' page.", async () => {

            beforeEach(() => {
                jest.spyOn(window.localStorage, "setItem").mockImplementation((): any => {
                    localStorage.setItem("token", fakeToken)
                });
                // localStorage.setItem("token", fakeToken);
            });

            // render(
            //     <CookiesProvider>
            //         <MockedProvider mocks={[]} addTypename={false}>
            //             <BaseRoutes />
            //         </MockedProvider>
            //     </CookiesProvider>
            // );
            // fireEvent.click(screen.getByTestId("Projects"));
            // expect(screen.getByText(/ProjectsPage/i)).toBeInTheDocument();

            render(
                <CookiesProvider>
                    <MockedProvider mocks={[]} addTypename={false}>
                        <BaseRoutes/>
                    </MockedProvider>
                </CookiesProvider>
            );
            localStorage.getItem("token");
            fireEvent.click(screen.getByTestId("Projects"));
            expect(screen.getByText(/ProjectsPage/i)).toBeInTheDocument();
        });
    });

    // describe("When user click on 'users' link...", () => {
    //     it("It redirects user on 'Users' page.", () => {
    //         render(
    //             <MockedProvider mocks={[]} addTypename={false}>
    //                 <BaseRoutes>
    //                     <ProtectedRoutes />
    //                 </BaseRoutes>
    //             </MockedProvider>
    //         );
    //         fireEvent.click(screen.getByTestId("Users"));
    //         expect(screen.getByText(/UsersPage/i)).toBeInTheDocument();
    //     });
    // });


});
