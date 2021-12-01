CREATE DATABASE IF NOT EXISTS `wasfadb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `wasfadb`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `age` varchar(10) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `GPS_X` varchar(255) NOT NULL,
  `GPS_Y` varchar(255) NOT NULL 

) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `recette` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `methode` varchar(100) NOT NULL,
  `theme` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `niveau` varchar(10) NOT NULL,
  `temps_realisation` varchar(255) NOT NULL,
  `date_dajout` varchar(255) NOT NULL,
  `active` varchar(255) NOT NULL

) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ingredient` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `categorie` varchar(255) NOT NULL

) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `favorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL

) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL,
  `photo` varchar(255) NOT NULL

) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `store` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `tel` int(14) NOT NULL,
  `livraison` varchar(100) NOT NULL,
  `GPS_X` varchar(255) NOT NULL,
  `GPS_Y` varchar(255) NOT NULL

) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;



INSERT INTO `users` (`id`, `nom`, `prenom`, `email`,`password`, `address`, `age`,`genre`, `type`, `GPS_X`, `GPS_Y`) VALUES (1, 'test', 'test', 'test@test.com', 'test', 'test', 'test', 'test', 'test', 'test','test');
INSERT INTO `recette` (`id`, `titre`, `description`, `methode`,`theme`, `type`, `niveau`,`temps_realisation`, `date_dajout`, `active`) VALUES (1, 'test', 'test', 'test.com', 'test', 'test', 'test', 'test', 'test', 'test');
INSERT INTO `ingredient` (`id`, `nom`, `categorie`) VALUES (1, 'test', 'test');
INSERT INTO `favorie` (`id`, `nom`) VALUES (1, 'test');
INSERT INTO `images` (`id`, `photo`) VALUES (1, 'test');
INSERT INTO `store` (`id`, `nom`, `email`, `tel`, `livraison`, `GPS_X`, `GPS_Y`) VALUES (1, 'test', 'test', 'test', 'test', 'test', 'test');

ALTER TABLE `users` ADD PRIMARY KEY (`id`);
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

ALTER TABLE `recette` ADD PRIMARY KEY (`id`);
ALTER TABLE `recette` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

ALTER TABLE `ingridient` ADD PRIMARY KEY (`id`);
ALTER TABLE `ingridient` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;


ALTER TABLE `favorie` ADD PRIMARY KEY (`id`);
ALTER TABLE `favorie` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

ALTER TABLE `images` ADD PRIMARY KEY (`id`);
ALTER TABLE `images` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

ALTER TABLE `store` ADD PRIMARY KEY (`id`);
ALTER TABLE `store` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
