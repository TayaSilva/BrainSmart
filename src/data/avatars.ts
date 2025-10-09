import avatarsJson from '../../public/images/icons-profile/avatars.json';

const avatarFolder = '/images/icons-profile';

const avatarOptions: string[] = avatarsJson.map(
	(name: string) => `${avatarFolder}/${name}`
);

export default avatarOptions;
