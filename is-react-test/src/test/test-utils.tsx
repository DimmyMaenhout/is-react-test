import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import React from "react";

type RenderOptions = {
  route?: string;
  postsCache?: unknown;
};

export function renderWithProviders(
  ui: React.ReactElement,
  { route = "/", postsCache }: RenderOptions = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  if (postsCache !== undefined) {
    queryClient.setQueryData(["posts"], postsCache);
  }

  const router = createMemoryRouter(
    [
      { path: "/", element: ui },
      { path: "/posts/:id", element: ui },
    ],
    {
      initialEntries: [route],
    },
  );

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}
