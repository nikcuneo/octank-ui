// eslint-disable
// this is an auto generated file. This will be overwritten

export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    user_id
    title
    description
    thumbnailurl
    videourl
    upvotes
    downvotes
  }
}
`;
export const listEvents = `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user_id
      title
      description
      thumbnailurl
      videourl
      upvotes
      downvotes
    }
    nextToken
  }
}
`;
