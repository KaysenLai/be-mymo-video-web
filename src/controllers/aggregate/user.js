import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const profileAggregate = (userId) => [
  {
    $match: {
      _id: new ObjectId(userId),
    },
  },
  {
    $lookup: {
      from: 'users',
      let: {
        followings: '$following',
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ['$_id', '$$followings'],
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
      as: 'following',
    },
  },
  {
    $lookup: {
      from: 'users',
      let: {
        followers: '$follower',
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ['$_id', '$$followers'],
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
      as: 'follower',
    },
  },
  {
    $lookup: {
      from: 'videos',
      let: {
        videos: '$video',
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ['$_id', '$$videos'],
            },
          },
        },
        {
          $project: {
            cover: 1,
            video: 1,
            likeNum: {
              $size: '$like',
            },
            description: 1,
          },
        },
      ],
      as: 'video',
    },
  },
  {
    $lookup: {
      from: 'videos',
      let: {
        likeVideos: '$likeVideo',
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ['$_id', '$$likeVideos'],
            },
          },
        },
        {
          $project: {
            cover: 1,
            video: 1,
            likeNum: {
              $size: '$like',
            },
            description: 1,
          },
        },
      ],
      as: 'likeVideo',
    },
  },
  {
    $project: {
      password: 0,
    },
  },
];
export const myProfileAggregate = (userId) => {
  const addToField = {
    $addFields: {
      followerNum: {
        $size: '$follower',
      },
      followingNum: {
        $size: '$following',
      },
    },
  };
  return [...profileAggregate(userId), addToField];
};

export const idProfileAggregate = (queryId, userId) => {
  const addToField = {
    $addFields: {
      followerNum: {
        $size: '$follower',
      },
      followingNum: {
        $size: '$following',
      },
      isFollowing: {
        $in: [new ObjectId(userId), '$follower._id'],
      },
      isMyself: {
        $eq: [new ObjectId(userId), new ObjectId(queryId)],
      },
    },
  };
  return [...profileAggregate(queryId), addToField];
};
