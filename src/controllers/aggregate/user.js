import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
export const myProfileAggregate = (userId) => [
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
    $addFields: {
      followerNum: {
        $size: '$follower',
      },
      followingNum: {
        $size: '$following',
      },
    },
  },
  {
    $project: {
      password: 0,
    },
  },
];
