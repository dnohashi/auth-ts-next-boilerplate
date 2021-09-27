import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The Email scalar type represents E-Mail addresses compliant to RFC 822. */
  Email: any;
};

export type FormError = {
  __typename?: 'FormError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: TodoResponse;
  deleteTodo: TodoResponse;
  completeTodo: TodoResponse;
  resetTodo: TodoResponse;
  updateTodo: TodoResponse;
  signup: UserResponse;
  signin: UserResponse;
  logout: UserResponse;
  requestResetToken: ResetPasswordResponse;
  resetPassword: ResetPasswordResponse;
};

export type MutationCreateTodoArgs = {
  data: TodoProps;
};

export type MutationDeleteTodoArgs = {
  id: Scalars['String'];
};

export type MutationCompleteTodoArgs = {
  id: Scalars['String'];
};

export type MutationResetTodoArgs = {
  id: Scalars['String'];
};

export type MutationUpdateTodoArgs = {
  data: TodoProps;
  id: Scalars['String'];
};

export type MutationSignupArgs = {
  params: UserSignUpInput;
};

export type MutationSigninArgs = {
  params: UserSignInInput;
};

export type MutationRequestResetTokenArgs = {
  params: RequestTokenLinkInput;
};

export type MutationResetPasswordArgs = {
  params: ResetPasswordInput;
};

export type Query = {
  __typename?: 'Query';
  todos: TodoResponse;
  me?: Maybe<UserResponse>;
  getUser?: Maybe<UserResponse>;
};

export type QueryGetUserArgs = {
  params: UserGetInput;
};

export type RequestTokenLinkInput = {
  email: Scalars['String'];
};

export type ResetPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type ResetPasswordRequest = {
  __typename?: 'ResetPasswordRequest';
  id: Scalars['ID'];
  token: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  expired: Scalars['Boolean'];
  consumed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<FormError>>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  userId: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  completedAt?: Maybe<Scalars['DateTime']>;
};

export type TodoProps = {
  title: Scalars['String'];
  completedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type TodoResponse = {
  __typename?: 'TodoResponse';
  errors?: Maybe<Array<FormError>>;
  todos?: Maybe<Array<Todo>>;
  todo?: Maybe<Todo>;
  message?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  userType: UserType;
  emailVerifiedAt?: Maybe<Scalars['DateTime']>;
  refreshToken?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<ResetPasswordRequest>>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type UserGetInput = {
  id: Scalars['ID'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FormError>>;
  user?: Maybe<User>;
  message?: Maybe<Scalars['String']>;
};

export type UserSignInInput = {
  email: Scalars['Email'];
  password: Scalars['String'];
};

export type UserSignUpInput = {
  email: Scalars['Email'];
  username: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export enum UserType {
  AdminUser = 'ADMIN_USER',
  BetaUser = 'BETA_USER',
  NormalUser = 'NORMAL_USER',
}

export type TodoResponseFragmentFragment = {
  __typename?: 'TodoResponse';
} & Pick<TodoResponse, 'message'> & {
    errors?: Maybe<
      Array<{ __typename?: 'FormError' } & Pick<FormError, 'field' | 'message'>>
    >;
    todo?: Maybe<
      { __typename?: 'Todo' } & Pick<
        Todo,
        'id' | 'title' | 'createdAt' | 'updatedAt' | 'completedAt' | 'deletedAt'
      >
    >;
  };

export type TodosResponseFragmentFragment = {
  __typename?: 'TodoResponse';
} & Pick<TodoResponse, 'message'> & {
    errors?: Maybe<
      Array<{ __typename?: 'FormError' } & Pick<FormError, 'field' | 'message'>>
    >;
    todos?: Maybe<
      Array<
        { __typename?: 'Todo' } & Pick<
          Todo,
          | 'id'
          | 'title'
          | 'createdAt'
          | 'updatedAt'
          | 'completedAt'
          | 'deletedAt'
        >
      >
    >;
  };

export type UserResponseFragmentFragment = {
  __typename?: 'UserResponse';
} & Pick<UserResponse, 'message'> & {
    errors?: Maybe<
      Array<{ __typename?: 'FormError' } & Pick<FormError, 'field' | 'message'>>
    >;
    user?: Maybe<
      { __typename?: 'User' } & Pick<User, 'id' | 'email' | 'username'>
    >;
  };

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & {
  logout: { __typename?: 'UserResponse' } & UserResponseFragmentFragment;
};

export type SigninMutationVariables = Exact<{
  params: UserSignInInput;
}>;

export type SigninMutation = { __typename?: 'Mutation' } & {
  signin: { __typename?: 'UserResponse' } & UserResponseFragmentFragment;
};

export type SignupMutationVariables = Exact<{
  params: UserSignUpInput;
}>;

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup: { __typename?: 'UserResponse' } & UserResponseFragmentFragment;
};

export type CompleteTodoMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type CompleteTodoMutation = { __typename?: 'Mutation' } & {
  completeTodo: { __typename?: 'TodoResponse' } & TodoResponseFragmentFragment;
};

export type CreateTodoMutationVariables = Exact<{
  data: TodoProps;
}>;

export type CreateTodoMutation = { __typename?: 'Mutation' } & {
  createTodo: { __typename?: 'TodoResponse' } & TodoResponseFragmentFragment;
};

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteTodoMutation = { __typename?: 'Mutation' } & {
  deleteTodo: { __typename?: 'TodoResponse' } & TodoResponseFragmentFragment;
};

export type ResetTodoMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type ResetTodoMutation = { __typename?: 'Mutation' } & {
  resetTodo: { __typename?: 'TodoResponse' } & TodoResponseFragmentFragment;
};

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['String'];
  data: TodoProps;
}>;

export type UpdateTodoMutation = { __typename?: 'Mutation' } & {
  updateTodo: { __typename?: 'TodoResponse' } & TodoResponseFragmentFragment;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'UserResponse' } & UserResponseFragmentFragment>;
};

export type TodosQueryVariables = Exact<{ [key: string]: never }>;

export type TodosQuery = { __typename?: 'Query' } & {
  todos: { __typename?: 'TodoResponse' } & TodosResponseFragmentFragment;
};

export const TodoResponseFragmentFragmentDoc = gql`
  fragment TodoResponseFragment on TodoResponse {
    errors {
      field
      message
    }
    message
    todo {
      id
      title
      createdAt
      updatedAt
      completedAt
      deletedAt
    }
  }
`;
export const TodosResponseFragmentFragmentDoc = gql`
  fragment TodosResponseFragment on TodoResponse {
    errors {
      field
      message
    }
    message
    todos {
      id
      title
      createdAt
      updatedAt
      completedAt
      deletedAt
    }
  }
`;
export const UserResponseFragmentFragmentDoc = gql`
  fragment UserResponseFragment on UserResponse {
    errors {
      field
      message
    }
    message
    user {
      id
      email
      username
    }
  }
`;
export const LogoutDocument = gql`
  mutation logout {
    logout {
      ...UserResponseFragment
    }
  }
  ${UserResponseFragmentFragmentDoc}
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const SigninDocument = gql`
  mutation Signin($params: UserSignInInput!) {
    signin(params: $params) {
      ...UserResponseFragment
    }
  }
  ${UserResponseFragmentFragmentDoc}
`;
export type SigninMutationFn = Apollo.MutationFunction<
  SigninMutation,
  SigninMutationVariables
>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useSigninMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SigninMutation,
    SigninMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SigninMutation, SigninMutationVariables>(
    SigninDocument,
    options
  );
}
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<
  SigninMutation,
  SigninMutationVariables
>;
export const SignupDocument = gql`
  mutation Signup($params: UserSignUpInput!) {
    signup(params: $params) {
      ...UserResponseFragment
    }
  }
  ${UserResponseFragmentFragmentDoc}
`;
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const CompleteTodoDocument = gql`
  mutation CompleteTodo($id: String!) {
    completeTodo(id: $id) {
      ...TodoResponseFragment
    }
  }
  ${TodoResponseFragmentFragmentDoc}
`;
export type CompleteTodoMutationFn = Apollo.MutationFunction<
  CompleteTodoMutation,
  CompleteTodoMutationVariables
>;

/**
 * __useCompleteTodoMutation__
 *
 * To run a mutation, you first call `useCompleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeTodoMutation, { data, loading, error }] = useCompleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompleteTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CompleteTodoMutation,
    CompleteTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CompleteTodoMutation,
    CompleteTodoMutationVariables
  >(CompleteTodoDocument, options);
}
export type CompleteTodoMutationHookResult = ReturnType<
  typeof useCompleteTodoMutation
>;
export type CompleteTodoMutationResult =
  Apollo.MutationResult<CompleteTodoMutation>;
export type CompleteTodoMutationOptions = Apollo.BaseMutationOptions<
  CompleteTodoMutation,
  CompleteTodoMutationVariables
>;
export const CreateTodoDocument = gql`
  mutation CreateTodo($data: TodoProps!) {
    createTodo(data: $data) {
      ...TodoResponseFragment
    }
  }
  ${TodoResponseFragmentFragmentDoc}
`;
export type CreateTodoMutationFn = Apollo.MutationFunction<
  CreateTodoMutation,
  CreateTodoMutationVariables
>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTodoMutation,
    CreateTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(
    CreateTodoDocument,
    options
  );
}
export type CreateTodoMutationHookResult = ReturnType<
  typeof useCreateTodoMutation
>;
export type CreateTodoMutationResult =
  Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<
  CreateTodoMutation,
  CreateTodoMutationVariables
>;
export const DeleteTodoDocument = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      ...TodoResponseFragment
    }
  }
  ${TodoResponseFragmentFragmentDoc}
`;
export type DeleteTodoMutationFn = Apollo.MutationFunction<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTodoMutation,
    DeleteTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(
    DeleteTodoDocument,
    options
  );
}
export type DeleteTodoMutationHookResult = ReturnType<
  typeof useDeleteTodoMutation
>;
export type DeleteTodoMutationResult =
  Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
>;
export const ResetTodoDocument = gql`
  mutation ResetTodo($id: String!) {
    resetTodo(id: $id) {
      ...TodoResponseFragment
    }
  }
  ${TodoResponseFragmentFragmentDoc}
`;
export type ResetTodoMutationFn = Apollo.MutationFunction<
  ResetTodoMutation,
  ResetTodoMutationVariables
>;

/**
 * __useResetTodoMutation__
 *
 * To run a mutation, you first call `useResetTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetTodoMutation, { data, loading, error }] = useResetTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResetTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResetTodoMutation,
    ResetTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ResetTodoMutation, ResetTodoMutationVariables>(
    ResetTodoDocument,
    options
  );
}
export type ResetTodoMutationHookResult = ReturnType<
  typeof useResetTodoMutation
>;
export type ResetTodoMutationResult = Apollo.MutationResult<ResetTodoMutation>;
export type ResetTodoMutationOptions = Apollo.BaseMutationOptions<
  ResetTodoMutation,
  ResetTodoMutationVariables
>;
export const UpdateTodoDocument = gql`
  mutation UpdateTodo($id: String!, $data: TodoProps!) {
    updateTodo(id: $id, data: $data) {
      ...TodoResponseFragment
    }
  }
  ${TodoResponseFragmentFragmentDoc}
`;
export type UpdateTodoMutationFn = Apollo.MutationFunction<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTodoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTodoMutation,
    UpdateTodoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(
    UpdateTodoDocument,
    options
  );
}
export type UpdateTodoMutationHookResult = ReturnType<
  typeof useUpdateTodoMutation
>;
export type UpdateTodoMutationResult =
  Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...UserResponseFragment
    }
  }
  ${UserResponseFragmentFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const TodosDocument = gql`
  query todos {
    todos {
      ...TodosResponseFragment
    }
  }
  ${TodosResponseFragmentFragmentDoc}
`;

/**
 * __useTodosQuery__
 *
 * To run a query within a React component, call `useTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodosQuery(
  baseOptions?: Apollo.QueryHookOptions<TodosQuery, TodosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TodosQuery, TodosQueryVariables>(
    TodosDocument,
    options
  );
}
export function useTodosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TodosQuery, TodosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TodosQuery, TodosQueryVariables>(
    TodosDocument,
    options
  );
}
export type TodosQueryHookResult = ReturnType<typeof useTodosQuery>;
export type TodosLazyQueryHookResult = ReturnType<typeof useTodosLazyQuery>;
export type TodosQueryResult = Apollo.QueryResult<
  TodosQuery,
  TodosQueryVariables
>;
