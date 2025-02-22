-- CreateTable
CREATE TABLE `acc` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `certificate` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_id` INTEGER UNSIGNED NOT NULL,
    `acc_status_id` INTEGER UNSIGNED NOT NULL DEFAULT 2,
    `acc_type_id` INTEGER UNSIGNED NOT NULL,
    `acc_variant_id` INTEGER UNSIGNED NOT NULL,

    INDEX `FK_acc__acc_status`(`acc_status_id`),
    INDEX `FK_acc__acc_type`(`acc_type_id`),
    INDEX `FK_acc__acc_variant`(`acc_variant_id`),
    INDEX `FK_acc__user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acc_assessment` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `acc_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `FK_acc_assessment__acc`(`acc_id`),
    INDEX `FK_acc_assessment__user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acc_status` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acc_type` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `point_limit` INTEGER NOT NULL,
    `description` VARCHAR(255) NULL,
    `unity_of_measurement_id` INTEGER UNSIGNED NOT NULL,

    INDEX `FK_acc_type__unity_of_measurement`(`unity_of_measurement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acc_variant` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NULL,
    `points_per_unity` FLOAT NOT NULL,
    `acc_type_id` INTEGER UNSIGNED NOT NULL,

    INDEX `FK_variante_de_acc__acc_type`(`acc_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `migrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` BIGINT NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unity_of_measurement` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `registration` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `profile_id` INTEGER UNSIGNED NOT NULL,
    `course_id` INTEGER UNSIGNED NULL,

    INDEX `FK_user__course`(`course_id`),
    INDEX `FK_user__profile`(`profile_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `acc` ADD CONSTRAINT `FK_acc__acc_status` FOREIGN KEY (`acc_status_id`) REFERENCES `acc_status`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acc` ADD CONSTRAINT `FK_acc__acc_type` FOREIGN KEY (`acc_type_id`) REFERENCES `acc_type`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acc` ADD CONSTRAINT `FK_acc__acc_variant` FOREIGN KEY (`acc_variant_id`) REFERENCES `acc_variant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acc` ADD CONSTRAINT `FK_acc__user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acc_assessment` ADD CONSTRAINT `FK_acc_assessment__acc` FOREIGN KEY (`acc_id`) REFERENCES `acc`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acc_assessment` ADD CONSTRAINT `FK_acc_assessment__user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acc_type` ADD CONSTRAINT `FK_acc_type__unity_of_measurement` FOREIGN KEY (`unity_of_measurement_id`) REFERENCES `unity_of_measurement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acc_variant` ADD CONSTRAINT `FK_variante_de_acc__acc_type` FOREIGN KEY (`acc_type_id`) REFERENCES `acc_type`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `FK_user__course` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `FK_user__profile` FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

