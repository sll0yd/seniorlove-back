// index.js

// import models with associations from association.js
import {
	sequelize,
	Users,
	Event,
	Tag,
	Message,
	Testimony,
	Sentence,
} from "./association.js";

// export models to be used in controllers
export { sequelize, Users, Event, Tag, Message, Testimony, Sentence };