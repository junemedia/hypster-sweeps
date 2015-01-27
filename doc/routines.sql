DROP FUNCTION IF EXISTS HEX2BASE36;

DELIMITER $$
CREATE FUNCTION HEX2BASE36(_hex TEXT)
    RETURNS TEXT
BEGIN
    DECLARE _hex_len TINYINT;
    DECLARE _dec DECIMAL(65);
    DECLARE _chars CHAR(36);
    DECLARE _base36 TEXT;
    DECLARE _mod TINYINT;

    SET _hex_len = LENGTH(_hex);

    IF (_hex_len > 32) THEN
        SIGNAL SQLSTATE '40001'
        SET MESSAGE_TEXT =
        'Hex is out of range (max 32 chars)';
    END IF;

    -- convert from base-16 to base-10
    SET _dec = CAST(
        CONV(
            SUBSTRING(_hex, -LEAST(16, _hex_len)
        ), 16, 10)
        AS DECIMAL(65)
    );
    IF _hex_len > 16 THEN
        SET _dec = _dec + CAST(
            CONV(
                SUBSTRING(_hex, 1, _hex_len - 16), 16, 10)
            AS DECIMAL(65)
            ) * 18446744073709551616;
    END IF;

    -- convert from base-10 to base-36
    SET _chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    SET _base36 = "";
    WHILE _dec > 0 DO
        SET _mod = _dec % 36;
        SET _base36 = CONCAT(
            SUBSTRING(_chars, _mod + 1, 1),
            _base36
        );
        SET _dec = FLOOR(_dec / 36);
    END WHILE;

    return _base36;
END;
$$
DELIMITER ;