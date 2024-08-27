const { WebClient } = require('@slack/web-api');

const slackToken = process.env.SLACK_TOKEN;
const slackClient = new WebClient(slackToken);

async function getUserIdByEmail(email) {
    try {
        const response = await slackClient.users.lookupByEmail({ email });
        return response.user.id;
    } catch (error) {
        console.error(`Error retrieving Slack ID for email ${email}:`, error);
        throw error;
    }
}

// Function to create a Slack channel
async function createChannel(channelName) {
    try {
        const response = await slackClient.conversations.create({
            name: channelName,
            is_private: true,
        });
        return response.channel.id;
    } catch (error) {
        console.error('Error creating Slack channel:', error);
        throw error;
    }
}

// Function to invite users to a Slack channel
async function inviteUsersToChannel(channelId, userIds) {
    try {
        await slackClient.conversations.invite({
            channel: channelId,
            users: userIds.join(','),
        });
    } catch (error) {
        console.error('Error inviting users to Slack channel:', error);
        throw error;
    }
}

// Function to post a message with approval buttons
async function postApprovalMessage(channelId, requestingUser, approvalId) {
    try {
        await slackClient.chat.postMessage({
            channel: channelId,
            text: `Approval needed for drone request.`,
            attachments: [
                {
                    text: `Do you approve the drone request for ${requestingUser.first_name}?`,
                    fallback: 'You are unable to choose an option',
                    callback_id: `approval-${approvalId}`,
                    actions: [
                        {
                            name: 'approve',
                            text: 'Approve',
                            type: 'button',
                            value: 'approve',
                            style: 'primary',
                        },
                        {
                            name: 'deny',
                            text: 'Deny',
                            type: 'button',
                            value: 'deny',
                            style: 'danger',
                        },
                    ],
                },
            ],
        });
    } catch (error) {
        console.error('Error posting Slack message:', error);
        throw error;
    }
}

// Function to handle the approval or denial
async function handleApprovalAction(action) {
    const channelId = action.channel.id;

    try {
        if (action.actions[0].value === 'approve') {
            await slackClient.chat.postMessage({
                channel: channelId,
                text: 'The drone request has been approved.',
            });
        } else if (action.actions[0].value === 'deny') {
            await slackClient.chat.postMessage({
                channel: channelId,
                text: 'The drone request has been denied.',
            });
        }

        // Archive the channel
        await slackClient.conversations.archive({
            channel: channelId,
        });
    } catch (error) {
        console.error('Error handling Slack approval action:', error);
        throw error;
    }
}

module.exports = {
    getUserIdByEmail,
    createChannel,
    inviteUsersToChannel,
    postApprovalMessage,
    handleApprovalAction,
};
