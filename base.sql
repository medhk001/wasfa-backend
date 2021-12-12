Skip to content
Why GitHub? 
Team
Enterprise
Explore 
Marketplace
Pricing 
Search
Sign in
Sign up
medhk001
/
wasfa-backend
Public
02
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
wasfa-backend/sql
@medhk001
medhk001 comit1
Latest commit ad8961c 8 days ago
 History
 1 contributor
89 lines (67 sloc)  3.28 KB
   
CREATE DATABASE IF NOT EXISTS `wasfadb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `wasfadb`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `age` varchar(10) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `GPS_X` varchar(255) DEFAULT NULL,
  `GPS_Y` varchar(255) DEFAULT NULL 
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Index pour les tables déchargées
--

--
-- Index pour la table `det_recette`
--

CREATE TABLE IF NOT EXISTS `recette` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `methode` varchar(100) DEFAULT NULL,
  `theme` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `niveau` varchar(10) DEFAULT NULL,
  `temps_realisation` varchar(255) DEFAULT NULL,
  `date_dajout` varchar(255) DEFAULT NULL,
  `active` varchar(255) DEFAULT NULL

) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `ingredient` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `categorie` varchar(255) DEFAULT NULL

) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- CREATE TABLE IF NOT EXISTS `favorie` (
--  `id` int(11) NOT NULL,
--  `nom` varchar(255) NOT NULL
--) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `favorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
  `date_pro` date DEFAULT NULL,
  `id_recette` int(11) DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--CREATE TABLE IF NOT EXISTS `images` (
-- `id` int(11) NOT NULL,
--  `photo` varchar(255) NOT NULL
--) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `id_recette` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `store` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tel` int(14) DEFAULT NULL,
  `livraison` varchar(100) DEFAULT NULL,
  `GPS_X` varchar(255) DEFAULT NULL,
  `GPS_Y` varchar(255) DEFAULT NULL

) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `det_recette` (
  `id` int(11) NOT NULL,
  `qtte` double DEFAULT NULL,
  `id_recette` int(11) DEFAULT NULL,
  `id_ingredient` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `det_store` (
  `id` int(11) NOT NULL,
  `qtte` double DEFAULT NULL,
  `prix` double DEFAULT NULL,
  `livraison` double DEFAULT NULL,
  `id_store` int(11) DEFAULT NULL,
  `id_ingredient` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `det_store`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_store` (`id_store`),
  ADD KEY `fk_id_ingredient` (`id_ingredient`);

--
-- Index pour la table `favorie`
--
ALTER TABLE `favorie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_recette` (`id_recette`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rectte` (`id_recette`);

--
-- Index pour la table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `recette`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usr` (`id_usr`);

--
-- Index pour la table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `det_recette`
--
ALTER TABLE `det_recette`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `det_store`
--
ALTER TABLE `det_store`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `favorie`
--
ALTER TABLE `favorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `recette`
--
ALTER TABLE `recette`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `store`
--
ALTER TABLE `store`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `det_recette`
--
ALTER TABLE `det_recette`
  ADD CONSTRAINT `fk_id_ingredi` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredient` (`id`),
  ADD CONSTRAINT `fk_id_rectte` FOREIGN KEY (`id_recette`) REFERENCES `recette` (`id`);

--
-- Contraintes pour la table `det_store`
--
ALTER TABLE `det_store`
  ADD CONSTRAINT `fk_id_ingredient` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredient` (`id`),
  ADD CONSTRAINT `fk_id_store` FOREIGN KEY (`id_store`) REFERENCES `store` (`id`);

--
-- Contraintes pour la table `favorie`
--
ALTER TABLE `favorie`
  ADD CONSTRAINT `favorie_ibfk_1` FOREIGN KEY (`id_recette`) REFERENCES `recette` (`id`),
  ADD CONSTRAINT `favorie_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_rectte` FOREIGN KEY (`id_recette`) REFERENCES `recette` (`id`);

--
-- Contraintes pour la table `recette`
--
ALTER TABLE `recette`
  ADD CONSTRAINT `fk_usr` FOREIGN KEY (`id_usr`) REFERENCES `users` (`id`);
COMMIT;


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
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
