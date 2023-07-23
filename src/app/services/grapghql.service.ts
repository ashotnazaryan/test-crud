import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post'

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo) { }

  getPosts(search = ''): Observable<Post[]> {
    const query = gql`
      query {
        posts {
          data {
            id
            title
            body
          }
        }
      }
    `;
    return this.apollo.watchQuery<any>({ query }).valueChanges
      .pipe(
        map((response) => response.data?.posts.data || []),
        map((posts) => posts.filter(({ title }: Post) => title.includes(search)))
      );
  }

  getPostById(postId: string): Observable<Post> {
    const query = gql`
      query GetPostById($postId: ID!) {
        post(id: $postId) {
          id
          title
          body
        }
      }
    `;

    return this.apollo.watchQuery<any>({ query, variables: { postId: postId } }).valueChanges
      .pipe(
        map((response) => response.data?.post)
      )
  }

  createPost(title: string, body: string): Observable<any> {
    const mutation = gql`
      mutation ($title: String!, $body: String!) {
        createPost(input: { title: $title, body: $body }) {
          id
          title
          body
        }
      }
    `;
    return this.apollo.mutate<any>({ mutation, variables: { title, body } });
  }

  updatePost(id: string, title: string, body: string): Observable<any> {
    const mutation = gql`
      mutation ($id: ID!, $title: String!, $body: String!) {
        updatePost(id: $id, input: { title: $title, body: $body }) {
          id
          title
          body
        }
      }
    `;
    return this.apollo.mutate<any>({ mutation, variables: { id, title, body } });
  }

  deletePost(id: string): Observable<any> {
    const mutation = gql`
      mutation deletePost($id: ID!) {
        deletePost(id: $id)
      }
    `;

    return this.apollo.mutate<any>({ mutation, variables: { id } });
  }
}
