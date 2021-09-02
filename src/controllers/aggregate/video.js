export const getVideoAggregate = (skip, limit) => [
  {
    $match: {},
  },
  {
    $lookup: {
      from: 'users',
      let: {
        author: '$author',
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ['$_id', '$$author'],
            },
          },
        },
        {
          $project: {
            avatar: 1,
            name: 1,
            followingNum: {
              $size: '$following',
            },
            followerNum: {
              $size: '$follower',
            },
            description: 1,
          },
        },
      ],
      as: 'author',
    },
  },
  {
    $unwind: {
      path: '$author',
    },
  },
  {
    $addFields: {
      likeNum: {
        $size: '$like',
      },
    },
  },
  {
    $skip: skip,
  },
  {
    $limit: limit,
  },
  {
    $sort: {
      createdAt: -1,
    },
  },
];
